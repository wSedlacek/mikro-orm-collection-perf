wrk -t12 -c400 -d30s http://localhost:3000/publishers
wrk -t12 -c400 -d30s http://localhost:3000/authors
wrk -t12 -c400 -d30s http://localhost:3000/authors/0/unloaded-books
wrk -t12 -c400 -d30s http://localhost:3000/authors/0/books
