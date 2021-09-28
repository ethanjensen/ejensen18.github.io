def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

def binom(n,k):
    return round(factorial(n)/(factorial(n-k)*factorial(k)))

def get_bernoulli(n):
    if n == 0:
        return 1
    else:
        s = 0
        for k in range(n):
            s = s + binom(n+1,k)*get_bernoulli(k)
        return 1 - s/(n+1)

def get_prime_decomposition(big_number):
    prime_factors = []
    multiplicities = []
    primes = []
    n = 2
    while n <= big_number:
        is_prime = True
        #generate a new prime
        for prime in primes:
            if n % prime == 0:
                is_prime = False
        #for the new prime, see how many times it divides the big number
        if is_prime:
            primes.append(n)
            while big_number % n == 0:
                if n not in prime_factors:
                    prime_factors.append(n)
                    multiplicities.append(1)
                else:
                    multiplicities[prime_factors.index(n)] += 1
                big_number = big_number / n
        if n > pow(big_number,0.5) and big_number != 1:
            prime_factors.append(int(big_number))
            multiplicities.append(1)
            big_number = 1
        n = n + 1
    return prime_factors, multiplicities

def sigma(k,n):
    N = 1
    prime_factors, multiplicities = get_prime_decomposition(n)
    for i in range(len(prime_factors)):
        p = prime_factors[i]
        s = 0
        for j in range(multiplicities[i] + 1):
            s += p**(k*j)
        N = N*s
    return N

def get_coefficient_eisenstein(k,m):
    if m == 0:
        return 1
    else:
        return round(-2*k/get_bernoulli(k)*sigma(k-1,m))

def get_all_fourier_coefficients_eisenstein(k,N):
    coefficients = []
    for m in range(N):
        coefficients.append(get_coefficient_eisenstein(k,m))
    return coefficients

def listmult(lists):
    newlist = lists[0]
    for i in range(1, len(lists)):
        templist = []
        for j in range(0, len(newlist)):
            c = 0
            for k in range(0, j+1):
                c = c + newlist[k]*lists[i][j-k]
            templist.append(c)
        newlist = templist
    return newlist

def get_all_fourier_coefficients_delta(N):
    E4 = get_all_fourier_coefficients_eisenstein(4,N)
    E6 = get_all_fourier_coefficients_eisenstein(6,N)
    E43 = listmult([E4,E4,E4])
    E62 = listmult([E6, E6])
    delta = []
    for i in range(len(E62)):
        delta.append(round((E43[i] - E62[i])/1728))
    return delta

def get_dim(k):
    d = 0
    if k % 2 == 0:
        d = k//12
        if k % 12 != 2:
            d = d + 1
    return d

#This is the Miller basis
def get_fourier_basis(k, N):
    d = get_dim(k)
    E6 = get_all_fourier_coefficients_eisenstein(6,N)
    delta = get_all_fourier_coefficients_delta(N)

    basis = []
    if k % 12 == 0:
        f0 = [0]*N
        f0[0] = 1
    else:
        f0 = get_all_fourier_coefficients_eisenstein((k-4) % 12 + 4, N)
        basis.append(f0)
        d = d-1

    for j in range(d):
        f = f0
        for i in range(2*(d-j-1)):
            f = listmult([f, E6])
        for i in range(j+1):
            f = listmult([f, delta])
        basis.append(f)
    return basis

# Take the Miller basis and use that basis to make a modular form given a
# set of d initial coefficients.
# We do this by grabbing the first d terms of the basis. (use len(basis)) and
# solving a system of equations. Then we generate the rest of the N coefficients
# by adding up fixed linear combinations of terms from each basis element.
def generate_modular_form_from_initial_coefficients(k, coefficients, N):
    basis = get_fourier_basis(k,N)
    C = []
    d = get_dim(k)
    for i in range(0, d):
        c = coefficients[i]
        for j in range(0, i-1):
            c = c - basis[j][i]*C[i-1]
        C.append(c)

    new_modular_form = []
    for i in range(N):
        a = 0
        for j in range(d):
            a = a + C[j]*basis[j][i]
        new_modular_form.append(a)
    return new_modular_form

print(get_all_fourier_coefficients_delta(20))
print(get_dim(30))
print(get_fourier_basis(34, 10))
