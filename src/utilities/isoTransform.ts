
export const COS_45 = Math.cos(Math.PI / 4)
export const SIN_45 = Math.sin(Math.PI / 4)

export function isoTransform(x: number, y: number, z: number){
    const _x = ((COS_45 * x) + SIN_45 * (y)) * 30,
    _y = ((SIN_45 * x) + (-COS_45 * y)) * 17.5 + (12 * z)
    return {x: _x, y: _y}
}