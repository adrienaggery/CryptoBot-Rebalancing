import numpy as np

def simplex_proj(y):
    """ Projection of y onto simplex. """
    m = len(y)
    bget = False

    s = sorted(y, reverse=True)
    tmpsum = 0.

    for ii in range(m-1):
        tmpsum = tmpsum + s[ii]
        tmax = (tmpsum - 1) / (ii + 1);
        if tmax >= s[ii+1]:
            bget = True
            break

    if not bget:
        tmax = (tmpsum + s[m-1] -1)/m

    return np.maximum(y-tmax,0.)

v = np.array([ 14.491324605164289,
  -5.825761784064074,
  -5.941021301098939,
  3.3481598130012693,
  -2.701724604389334,
  0.07994177732137656,
  -2.450918505934403 ])
print(v)
simplex = simplex_proj(v)
print(simplex)
