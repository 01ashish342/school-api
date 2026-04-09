const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const db=require('./db.js');

const app=express();

app.use(bodyParser.json());
app.use(cors());

const PORT=process.env.PORT || 3000;

app.post('/addschool', (req,res)=> {

    const { name, address, latitude, longitude }=req.body;

    if(!name || !address || !latitude || !longitude){

        return res.status(400).json({ error: "All fields are required"});

    }

    if(typeof latitude !== 'number' || typeof longitude !=='number'){

        return res.status(400).json({ error: "latitude and longitude must be number"});
    }

    const query= "INSERT INTO schools (name,address,latitude,longitude ) VALUES (?,?,?,?)";

    db.query(query, [name, address,latitude, longitude], (err, result) => {

        if(err){
            console.error("Error inserting data:", err);

            return res.status(500).json({ error: "Database error"});

        }

        return res.status(201).json({ message: "School added successfully", 
            schoolId : result.insertId
        });
    });
});


function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km

  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}








app.get('/listSchools', (req,res)=> {

    const { latitude, longitude } =req.query;

    if(latitude==null || longitude==null){
        return res.status(400).json({ error: "latitude and longitude are required"});

    }

    db.query("SELECT* FROM schools", (err,result) => {

        if(err){
           return res.status(500).json({ error: "Database error"});

        }

        const userlat=parseFloat(latitude);
        const userlon=parseFloat(longitude);

        const sortedschools=result.map( (school)=> {

             const distance = getDistance(
          userlat,
          userlon,
          school.latitude,
          school.longitude
        );

        return { ...school, distance };
        })
        .sort((a,b)=> a.distance - b.distance);

        res.json(sortedschools);
    });

});


app.listen(PORT, ()=> {

    console.log(`Server is running on port ${PORT}`);

});
