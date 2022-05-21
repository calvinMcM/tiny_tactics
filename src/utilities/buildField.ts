
import SimplexNoise from 'simplex-noise';

export const noise = new SimplexNoise();

export function buildField(x: number, y: number, maxHeight: number){
    const field = []
    for(let col_i = 0; col_i < x; col_i++){
        const r = []
        for(let row_i = 0; row_i < x; row_i++){
            const base = Math.round(Math.abs(noise.noise2D(col_i / x, row_i / x)) * maxHeight)
            r.push(base)
        }
        field.push(r)
    }
    return field;
}