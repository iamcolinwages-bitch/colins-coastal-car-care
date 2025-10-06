# Background Video Setup

## File Requirements

**Place your background video here:**
- File name: `background.mp4`
- Full path: `/public/videos/background.mp4`

## Recommended Video Specs

### Format
- **Best format**: MP4 (H.264 codec)
- **Alternative**: WebM for smaller file size
- **Container**: MP4

### Quality Settings
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Frame Rate**: 24-30 fps
- **Bitrate**: 3-5 Mbps for good quality
- **File Size**: Keep under 5MB for fast loading
- **Duration**: 10-30 seconds (will loop seamlessly)

### Content Suggestions
For a car detailing business in Southwest Florida:
- Palm trees swaying in the breeze
- Sunset over the Gulf of Mexico
- Car being detailed (close-up shots)
- Florida coastal scenery
- Ocean waves (subtle, not distracting)

## How to Add Your Video

1. Get your video file in MP4 format
2. Rename it to `background.mp4`
3. Drop it into this folder: `/public/videos/`
4. The website will automatically use it!

## Video Conversion Tools

If you need to convert your video to MP4:
- **Online**: CloudConvert.com, Online-Convert.com
- **Desktop**: HandBrake (free), FFmpeg (advanced)
- **Mac**: QuickTime Player (File > Export)

### FFmpeg Command (if you have it installed):
```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 22 -c:a aac -b:a 128k background.mp4
```

## Current Overlays

The video has two overlays on top:
1. **Dark overlay** (40% black) - keeps text readable
2. **Red gradient** (bottom to top) - maintains your brand color

You can adjust these in `/app/page.tsx` if needed.
