import { FastAverageColor } from "fast-average-color";

export type RGB = {
    r: number;
    g: number;
    b: number;
}

export const useAvgBgColor = () => {

    return ( imgEl: HTMLImageElement | null ): RGB => {
        
        if( !imgEl || !imgEl.src ) return { r: 255, g: 144, b: 173 }

        var blockSize = 5, // only visit every 5 pixels
            defaultRGB = { r: 255, g: 144, b: 173 }, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = { r: 255, g: 144, b: 173 },
            count = 0;
    
        if (!context) {
            return defaultRGB;
        }
    
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
    
        context.drawImage(imgEl, 0, 0);
    
        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            /* security error, img on diff domain */
            return defaultRGB;
        }
    
        length = data.data.length;
    
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }
    
        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);
    
        return rgb;   
    }
}