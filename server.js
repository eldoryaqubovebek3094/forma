const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const data = [];

app.get("/all", (req, res) => {
  // Ma'lumotlarni o'qish
  fs.readFile('data.json', 'utf8', (err, jsonStr) => {
    if (err) {
      console.error(err);
      res.status(500).send('Serverdagi ichki xatolik');
      return;
    }

    let existingData = [];
    try {
      existingData = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send('Serverdagi ichki xatolik');
      return;
    }

    // Yangi ma'lumotlarni qo'shish
    existingData.push(...data);

    // Ma'lumotlarni faylga saqlash
    fs.writeFile('data.json', JSON.stringify(existingData), (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        res.status(500).send('Serverdagi ichki xatolik');
      } else {
        res.send('Maʼlumotlar muvaffaqiyatli saqlandi');
      }
    });
  });
});

// app.get("/all", (req, res) => {
//   fs.writeFile('data.json', JSON.stringify(data), (err) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.send('Data saved successfully');
//     }
//   });
// });

// app.get("/all", (req, res) => {
//   res.send(data);
// });

app.post('/contact', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  if (!name || !email || !message) {
    return res.status(400).send('Majburiy maydonlar yetishmayapti');
  }

  data.push({ name, email, message });
  console.log(req.body);
  // Do something with the form data, e.g., save it in a database or send an email
  res.sendStatus(200);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Serverdagi ichki xatolik');
});

app.listen(port, () => {
  console.log(`Server ${port} portda ishlamoqda `);
});