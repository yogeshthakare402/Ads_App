const express = require("express");
const router = express.Router();
const companies = require("../models/companyModel")
const ads = require("../models/adsModel");

router.get("/", async(req,res)=>{
    try {
        console.log("Find ads")
        let ad = await ads.aggregate([{
            $lookup:{
              from:"companies",
              localField:"companyId",
              foreignField:"_id",
              as:"company"
            }
          },
          {
            $unwind: {
              path: "$company",
            }
          }
          ])
        if(ad){
            // console.log(ad)
            res.status(200).json({
                status:"Success",
                ads:ad
            })
        }
        
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            message:error.message
        })
    }
})

router.get("/:str", async(req,res)=>{
    try {
        console.log("Find ads")
        console.log(req.params);
        let str = req.params.str;
        console.log(str)
        let ad = await ads.aggregate([{
            $lookup:{
              from:"companies",
              localField:"companyId",
              foreignField:"_id",
              as:"company"
            }
          },
          {
            $unwind: {
              path: "$company",
            }
          },
          { 
            $match: { 
                $or: [ 
                    {"company.name":{$regex : str}}, 
                    {primaryText:{$regex : str}},
                    {headline:{$regex : str}},
                    {description:{$regex : str}} 
                  ] 
                } 
          }
          ])
        if(ad){
            console.log(ad)
            res.status(200).json({
                status:"Success",
                ads:ad
            })
        }
        
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            message:error.message
        })
    }
})


module.exports = router