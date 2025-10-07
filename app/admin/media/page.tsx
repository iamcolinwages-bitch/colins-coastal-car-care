'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Upload, Trash2, Edit2, Grid, List, Search, Plus, X, Check, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

interface MediaItem {
  id: string;
  filename: string;
  storage_path: string;
  url: string;
  file_size: number;
  width: number;
  height: number;
  category: 'portfolio' | 'hero' | 'gallery' | 'testimonial' | 'other';
  alt_text: string;
  tags: string[];
  display_order: number;
  is_active: boolean;
  uploaded_at: string;
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const supabase = createClient();

  useEffect(() => {
    fetchMedia();
  }, [categoryFilter]);

  async function fetchMedia() {
    setLoading(true);
    let query = supabase
      .from('media')
      .select('*')
      .order('display_order', { ascending: true })
      .order('uploaded_at', { ascending: false });

    if (categoryFilter !== 'all') {
      query = query.eq('category', categoryFilter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching media:', error);
    } else {
      setMedia(data || []);
    }
    setLoading(false);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        // Upload to storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('media')
          .getPublicUrl(filePath);

        // Get image dimensions
        const img = new Image();
        const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
          img.onload = () => resolve({ width: img.width, height: img.height });
          img.src = URL.createObjectURL(file);
        });

        // Insert into database
        const { error: dbError } = await supabase
          .from('media')
          .insert({
            filename: file.name,
            storage_path: filePath,
            url: urlData.publicUrl,
            file_size: file.size,
            width: dimensions.width,
            height: dimensions.height,
            category: 'other',
            alt_text: file.name.replace(/\.[^/.]+$/, ''),
            is_active: true,
            display_order: 0
          });

        if (dbError) throw dbError;
      } catch (error) {
        console.error('Error uploading file:', error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    setUploading(false);
    fetchMedia();
  }

  async function deleteMedia(item: MediaItem) {
    if (!confirm(`Delete ${item.filename}?`)) return;

    // Delete from storage
    await supabase.storage.from('media').remove([item.storage_path]);

    // Delete from database
    const { error } = await supabase
      .from('media')
      .delete()
      .eq('id', item.id);

    if (error) {
      console.error('Error deleting media:', error);
      alert('Failed to delete media');
    } else {
      fetchMedia();
    }
  }

  async function updateMedia(item: MediaItem) {
    const { error } = await supabase
      .from('media')
      .update({
        category: item.category,
        alt_text: item.alt_text,
        is_active: item.is_active,
        display_order: item.display_order,
        tags: item.tags
      })
      .eq('id', item.id);

    if (error) {
      console.error('Error updating media:', error);
      alert('Failed to update media');
    } else {
      setEditingItem(null);
      fetchMedia();
    }
  }

  const filteredMedia = media.filter(item =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.alt_text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Media Library</h1>
            <p className="text-gray-400">Manage all your images and media files</p>
          </div>
          <Link
            href="/admin"
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Back to Admin
          </Link>
        </div>

        {/* Actions Bar */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Upload */}
            <div className="relative">
              <label className="px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg font-semibold cursor-pointer inline-flex items-center gap-2 transition-colors">
                <Upload className="w-5 h-5" />
                Upload Images
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search images..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-800 hover:bg-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-4">
            {['all', 'portfolio', 'hero', 'gallery', 'testimonial', 'other'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  categoryFilter === cat
                    ? 'bg-primary text-white'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Media Count */}
        <div className="mb-4 text-gray-400">
          {filteredMedia.length} {filteredMedia.length === 1 ? 'item' : 'items'}
        </div>

        {/* Media Grid/List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No media found</p>
            <p className="text-gray-500 text-sm mt-2">Upload some images to get started</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-all group"
              >
                <div className="aspect-square relative bg-gray-800">
                  <img
                    src={item.url}
                    alt={item.alt_text || item.filename}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-2 bg-primary hover:bg-primary-dark rounded-lg transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteMedia(item)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-medium truncate mb-1">{item.filename}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="px-2 py-1 bg-gray-800 rounded">{item.category}</span>
                    <span>{item.width}x{item.height}</span>
                  </div>
                  {!item.is_active && (
                    <span className="text-xs text-red-400 mt-2 block">Inactive</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-900 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Preview</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Filename</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Dimensions</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredMedia.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/50">
                    <td className="px-6 py-4">
                      <img
                        src={item.url}
                        alt={item.alt_text || item.filename}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium">{item.filename}</p>
                      <p className="text-sm text-gray-400">{(item.file_size / 1024).toFixed(1)} KB</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-800 rounded text-sm">{item.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {item.width} x {item.height}
                    </td>
                    <td className="px-6 py-4">
                      {item.is_active ? (
                        <span className="text-green-400 text-sm">Active</span>
                      ) : (
                        <span className="text-red-400 text-sm">Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteMedia(item)}
                          className="p-2 hover:bg-red-900/30 text-red-400 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Edit Media</h2>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Preview */}
              <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden">
                <img
                  src={editingItem.url}
                  alt={editingItem.alt_text || editingItem.filename}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Filename</label>
                  <input
                    type="text"
                    value={editingItem.filename}
                    disabled
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Alt Text</label>
                  <input
                    type="text"
                    value={editingItem.alt_text || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, alt_text: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value as MediaItem['category'],
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary"
                  >
                    <option value="portfolio">Portfolio</option>
                    <option value="hero">Hero</option>
                    <option value="gallery">Gallery</option>
                    <option value="testimonial">Testimonial</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Display Order</label>
                  <input
                    type="number"
                    value={editingItem.display_order}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        display_order: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-primary"
                  />
                  <p className="text-xs text-gray-400 mt-1">Lower numbers appear first</p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={editingItem.is_active}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, is_active: e.target.checked })
                    }
                    className="w-5 h-5 text-primary rounded"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium">
                    Active (visible on website)
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button
                  onClick={() => setEditingItem(null)}
                  className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateMedia(editingItem)}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
