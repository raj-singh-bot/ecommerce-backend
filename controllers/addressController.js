const UserAddress = require('../model/addressModel')

const addAddress = async(req, res) => {
    console.log(req.user)
    console.log(req.body.payload)
    const {payload} = req.body
    if(payload.address){
        if(payload.address._id){
            UserAddress.findOneAndUpdate(
                { user: req.user.id, "address._id": payload.address._id },
                {
                  $set: {
                    "address.$": payload.address,
                  },
                }
              ).exec((error, address) => {
                if (error) return res.status(400).json({ error });
                if (address) {
                  res.status(201).json({ address });
                }
              });
        }else{
            UserAddress.findOneAndUpdate(
                { user: req.user.id },
                {
                  $push: {
                    address: payload.address,
                  },
                },
                { new: true, upsert: true }
              ).exec((error, address) => {
                if (error) return res.status(400).json({ error });
                if (address) {
                  res.status(201).json({ address });
                }
              });
        }
    }else{
        res.status(400).json({error: 'please provide address'})
    }
}

const getAddress = (req, res) => {
    UserAddress.findOne({ user: req.user.id }).exec((error, userAddress) => {
      if (error) return res.status(400).json({ error });
      if (userAddress) {
        res.status(200).json({ userAddress });
      }
    });
  };

module.exports = {addAddress, getAddress}