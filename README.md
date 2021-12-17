# Performance Testing of MikroORM

This repo is configured to test the impact of collections.

## Requirements

[docker](https://docs.docker.com/desktop/mac/install/)
[docker-compose](https://docs.docker.com/compose/install/)
[wrk](https://github.com/wg/wrk)

## Setup

```bash
npm install
npm run start
```

### Database info

#### Publisher

Publisher is a table with no relationships
It is seeded with 10 random items

#### Author

Author is a table a one to many relationship with books
It is seeded with 10 random items
Books is seeded with 2 random items per author

### Endpoints

#### /publishers

A `findAll()` on the `publisher` table

#### /authors

A `findAll()` on the `author` table

Note: `populate` is not set

#### /authors/:index/unloaded-books

A `findAll()` on the `author` table followed by selecting the `:index` of the resulting array and
returning the books.

Note: `populate` is not set

#### /authors/:index/books

A `findAll()` on the `author` table followed by selecting the `:index` of the resulting array and
returning the books.

Note: `populate` is set to `books`

## Benchmark

```bash
npm run benchmark
```

### Expected results

- There should be minimal difference between `/publishers` and `/authors`
- There should be basically no difference between `/authors` and `/authors/:index/unloaded-books`
- There should be a performance drop from `/authors/:index/unloaded-books` to `/authors/:index/books`

### Actual results

```txt
Running 30s test @ http://localhost:3000/publishers
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   144.45ms   28.92ms 313.02ms   87.38%
    Req/Sec   229.19     54.98   330.00     79.21%
  82101 requests in 30.09s, 67.26MB read
  Socket errors: connect 0, read 777, write 0, timeout 0
Requests/sec:   2728.84
Transfer/sec:      2.24MB
```

```txt
Running 30s test @ http://localhost:3000/authors
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   158.45ms   25.58ms 259.96ms   84.29%
    Req/Sec   209.02     54.59   330.00     74.19%
  74904 requests in 30.10s, 60.86MB read
  Socket errors: connect 0, read 345, write 0, timeout 0
Requests/sec:   2488.79
Transfer/sec:      2.02MB
```

```txt
Running 30s test @ http://localhost:3000/authors/0/unloaded-books
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   164.53ms   27.78ms 324.68ms   84.68%
    Req/Sec   201.67     54.11   313.00     72.96%
  72138 requests in 30.09s, 16.17MB read
  Socket errors: connect 0, read 376, write 0, timeout 0
Requests/sec:   2397.40
Transfer/sec:    550.18KB
```

```txt
Running 30s test @ http://localhost:3000/authors/0/books
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   343.27ms   40.02ms 473.34ms   73.07%
    Req/Sec    98.32     53.46   240.00     63.35%
  34474 requests in 30.10s, 15.39MB read
  Socket errors: connect 0, read 437, write 41, timeout 0
Requests/sec:   1145.36
Transfer/sec:    523.47KB
```

Note: There is a non trivial difference between `/publishers` and `/authors` in Requests/sec

Note: There is a performance drop from `/authors/0/unloaded-books` to `/authors/0/books` in Requests/sec
