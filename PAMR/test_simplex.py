import numpy as np

def simplex_proj(y):
    """ Projection of y onto simplex. """
    m = len(y)
    bget = False

    s = sorted(y, reverse=True)
    tmpsum = 0.
    print s
    for ii in range(m-1):
        tmpsum = tmpsum + s[ii]
        tmax = (tmpsum - 1) / (ii + 1);
        if tmax >= s[ii+1]:
            bget = True
            break

    if not bget:
        tmax = (tmpsum + s[m-1] -1)/m

    return np.maximum(y-tmax,0.)

v = np.array([10.112894770890602,4.299975144827983,2.3497749672424213,-4.406668902784275,-6.170378908691773,2.4872109550674866,-4.252540097741059,-0.5866700938564398,-2.83359783495518])
simplex = simplex_proj(v)
print(simplex)
