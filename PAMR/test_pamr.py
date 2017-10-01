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

def pamr(b, x, eps, C):
    """ Update portfolio weights to satisfy constraint b * x <= eps
    and minimize distance to previous weights. """
    x_mean = np.mean(x)
    le = max(0., np.dot(b, x) - eps)
    print le

    if 0 == 0:
        lam = le / np.linalg.norm(x - x_mean)**2
    elif variant == 1:
        lam = min(C, le / np.linalg.norm(x - x_mean)**2)
    elif variant == 2:
        lam = le / (np.linalg.norm(x - x_mean)**2 + 0.5 / C)
    print lam

    # limit lambda to avoid numerical problems
    lam = min(100000, lam)

    # update portfolio
    b = b - lam * (x - x_mean)
    print b

    # project it onto simplex
    return simplex_proj(b)

x = np.array([1,1.0359744990892532,0.9328968903436988,0.9808084239130436,0.9333434328132101,1.0144574870830259,1.0173611111111112,0.9810035253073228,0.9906232592684286,0.9958838112166144,0.9173942243116185])
b = np.array([1,0,0,0,0,0,0,0,0,0,0])
eps = 0.9
C = 100

print pamr(b, x, eps, C)
