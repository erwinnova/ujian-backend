const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
var mysql = require('mysql');

var connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'erwin',
  password  : '1234',
  database  : 'tokokasih'
});

const PORT = 4000

const app = express()

app.use(cors())
app.use(bodyParser.json())


app.get('/products', (req,res) => {
    const query = `SELECT * FROM products;`
    connection.query(query,(err,results) => {
        if(err) {
            res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.post('/addproduct', (req,res) => {
    const query = `INSERT INTO products SET ?;`
    connection.query(query, req.body, (err,results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.put('/editproduct/:id', (req,res) => {
    const query = `UPDATE products SET ? WHERE id = ${connection.escape(req.params.id)};`
    connection.query(query, req.body, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.delete('/deleteproduct/:id', (req,res) => {
    const query = `DELETE FROM products WHERE id = ${connection.escape(req.params.id)};`
    connection.query(query, (err,results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.get('/categories', (req,res) => {
    const query = `SELECT * FROM category_complete;`

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.get('/categories/:nama', (req,res) => {
    const query = `SELECT *
                    FROM categories
                    WHERE category = ${connection.escape(req.params.nama)};`

    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.post('addcategory', (req,res) => {
    const query = `INSERT INTO categories SET ? ;`
    connection.query(query, req.body, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.put('/categories/:id', (req,res) => {
    const query = `UPDATE categories SET ? WHERE id = ${connection.escape(req.params.id)};`
    connection.query(query, req.body, (err,results) => {
        if(err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.delete('/categories/:id', (req,res) => {
    const query = `DELETE FROM categories WHERE id = ${connection.escape(req.params.id)};`
    connection.query(query, (err,results) => {
        if(err) {
            res.status(500).send(errr)
        }
        res.status(200).send(results)
    })
})

app.get('/categories/:nama', (req,res) => {
        const query = `SELECT *
        FROM categories
        WHERE category = ${connection.escape(req.params.nama)};`

    connection.query(query, (err, results) => {
            if (err) {
                    return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.get('/productcategory', (req,res) => {
    const query = `SELECT * FROM prodcat;`
    connection.query(query, (err,results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.post('/addproductcategory', (req,res) => {
    const query = `INSERT INTO productcat SET ? ; `
    connection.query(query, req.body, (err, results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.delete('/deleteproductcategory/:id', (req,res) => {
    const query = `DELETE FROM productcat WHERE productId = ${connection.escape(req.params.id)};`
    connection.query(query,(err,results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.get('/getchildprodcat', (req,res) => {
    const query = `SELECT * FROM childcategory;`
    connection.query(query,(err,results) => {
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
    })
})

app.post('/addprodcat', (req,res) => {
    const query = `INSERT INTO productcat SET ? ;`
    connection.query(query, req.body, (err,results) => {
        console.log(req.body)
        if (err) {
            return res.status(500).send(err)
        }
        res.status(200).send(results)
        console.log(req.body.categoryId)
    })
})




app.listen(PORT, () => console.log(`API berhasil aktif di PORT ${PORT}`))