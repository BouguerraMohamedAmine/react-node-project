
const blogs = {results : []}

module.exports.getHandler = (req,res)=>{
   res.status(200).json(blogs)
}
module.exports.postHandler = (req,res)=>{
   blogs.results.push(req.body)
   res.status(201).json(blogs)
}
module.exports.errorHandler = (req,res)=>{
res.status(404).send(error)
}
module.exports.mainHandler = (req,res)=>{
      return res.send('waaa hassen')
}