# GoLove AI - Pixel-Perfect Clone Specification

## Extracted from original site (goloveai.com) via browser console

### Global
- Body background: `#0F0E0F` (rgb(15, 14, 15))
- Font: system default (Tailwind)
- Tracking: `-4%` on most text

### Navigation (LEFT SIDEBAR, not top bar!)
```
Sidebar: sticky top-0 z-30 flex h-[100dvh] w-[109px] shrink-0 flex-col items-center bg-[#0F0E0F] px-[12px] pt-[32px] pb-[12px]
Logo: size-[32px], link to /app/explore
Notification button: from-pink-start/10 to-pink-end/10, h-[36px], rounded-full, bg-gradient-to-br
Nav container: no-scrollbar flex min-h-0 w-[85px] flex-1 flex-col overflow-y-auto
```

### Nav Links
**Create button (special):**
```
group mx-[18px] mt-[22px] flex h-[72px] items-center justify-between gap-[16px] rounded-[16px] 
border border-[#FF18A0]/40 bg-gradient-to-br from-[#D05BF8]/10 to-[#FF18A0]/10 
px-[16px] py-[15px] transition-all hover:border-[#FF18A0]/60 hover:from-[#D05BF8]/15 hover:to-[#FF18A0]/15
```

**Regular nav link:**
```
group mx-[18px] mt-[8px] flex h-[72px] items-center justify-between gap-[16px] rounded-[16px] 
border border-white/[6%] bg-white/[4%] px-[16px] py-[15px] transition-colors hover:bg-white/[6%]
```

**Premium link:**
```
relative z-[3] flex h-[56px] items-center gap-[10px] rounded-[12px] px-[16px] text-white/70 
transition-all hover:bg-white/[4%] after:absolute after:inset-0 after:z-[1] after:rounded-[12px] 
after:bg-gradient-to-br after:from-[#20163D] after:via-[#301A35] after:to-[#391D28] after:opacity-0
```

### Main Content Area
```
@container/layout-content relative z-[1] flex min-h-[100dvh] w-full min-w-0 flex-col 
transition-[padding] duration-500 desktop:pt-[32px] desktop:pl-[20px] pt-[68px] 
desktop:pb-0 pb-[66px]
```

### Character Card
**Outer container:**
```
group/card @container relative flex flex-col justify-between overflow-hidden rounded-[22px] select-none
before:absolute before:inset-x-0 before:bottom-0 before:z-[2] before:h-[60%] 
before:bg-gradient-to-t before:from-black/90 before:to-transparent
after:pointer-events-none after:absolute after:inset-0 after:z-[2] 
after:bg-[linear-gradient(180deg,rgba(232,27,157,0)_56.76%,#E81B9D_100%)] 
after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100
h-[320px] w-full desktop:h-[420px] min-[1921px]:h-auto min-[1921px]:aspect-[2/3]
```

**Content overlay (bottom):**
```
relative z-[3] mt-auto p-[12px] select-text desktop:p-[16px]
Name: text-[16px] leading-[16px] font-[600] tracking-[-4%] text-white
Age: text-[16px] leading-[16px] font-[400] tracking-[-4%] text-white/50
Bio: mt-[8px] line-clamp-2 text-[12px] leading-[18px] font-[400] tracking-[-4%] text-white/[64%]
Tags container: mt-[8px] flex flex-wrap gap-[4px]
Tag pill: rounded-full bg-white/10 px-[8px] py-[5px] text-[10px] leading-[12px] font-[400] tracking-[-4%] capitalize backdrop-blur-[12px]
```

**Media (background):**
```
Container: absolute inset-0 overflow-hidden
Grid: grid h-full w-full auto-cols-[100%] grid-flow-col
NSFW Image: absolute inset-0 z-[0] h-full w-full object-cover transition-opacity duration-300 opacity-0
Video: pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover transition-opacity duration-300 opacity-100
```

### Banner/Hero Section
- 3 slides with auto-rotation
- Each slide has gradient background, title, subtitle, CTA button
- Bottom dots indicator
- Left/Right arrow buttons

### Live Characters Section
- Horizontal scroll of circular avatars (68px)
- Each avatar has ring-2 effect and LIVE badge
- "Join In" heading with "Live" badge

### Search & Filter Bar
- Search input: `e.g. petite Asian, thick Latina, dom MILF`
- Filter buttons: Gender, Style, Age, Characters, Newest
- Tag pills: 15 tags (MILF, Asian, Teen, Busty, Blonde, Goth, Ebony, Latina, Brunette, Athletic, Redhead, Kinky, Petite, Dominant, Submissive)

### CTA Cards
- "CREATE YOUR OWN AI GIRLFRIEND" with image background
- "FIRST SUBSCRIPTION!" with countdown timer

### Color Palette
- Primary pink: #FF18A0
- Primary purple: #D05BF8
- Dark bg: #0F0E0F
- Card bg: transparent (image bg)
- Text: white, white/50, white/[64%]
- Border: white/[6%]
- Glass: bg-white/10, backdrop-blur-[12px]
