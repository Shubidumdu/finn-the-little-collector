// @ts-nocheck

import { zzfxG, zzfxR } from './zzfx';

const zzfxM = (n, f, t, e = 125) => {
  let l,
    o,
    z,
    r,
    g,
    h,
    x,
    a,
    u,
    c,
    d,
    i,
    m,
    p,
    G,
    M = 0,
    R = [],
    b = [],
    j = [],
    k = 0,
    q = 0,
    s = 1,
    v = {},
    w = ((zzfxR / e) * 60) >> 2;
  for (; s; k++)
    (R = [(s = a = d = m = 0)]),
      t.map((e, d) => {
        for (
          x = f[e][k] || [0, 0, 0],
            s |= !!f[e][k],
            G = m + (f[e][0].length - 2 - !a) * w,
            p = d == t.length - 1,
            o = 2,
            r = m;
          o < x.length + p;
          a = ++o
        ) {
          for (
            g = x[o],
              u = (o == x.length + p - 1 && p) || (c != (x[0] || 0)) | g | 0,
              z = 0;
            z < w && a;
            z++ > w - 99 && u ? (i += (i < 1) / 99) : 0
          )
            (h = ((1 - i) * R[M++]) / 2 || 0),
              (b[r] = (b[r] || 0) - h * q + h),
              (j[r] = (j[r++] || 0) + h * q + h);
          g &&
            ((i = g % 1),
            (q = x[1] || 0),
            (g |= 0) &&
              (R = v[[(c = x[(M = 0)] || 0), g]] =
                v[[c, g]] ||
                ((l = [...n[c]]),
                (l[2] *= 2 ** ((g - 12) / 12)),
                g > 0 ? zzfxG(...l) : [])));
        }
        m = G;
      });
  return [b, j];
};

export default zzfxM;
