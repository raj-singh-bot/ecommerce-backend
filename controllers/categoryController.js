const  slugify  = require('slugify');
const Category = require('../model/categoryModel')

function createCategories(categories, parentId = null) {
  // console.log('categories', categories)
    const categoryList = [];
    let category;
    if (parentId == null) {
      category = categories.filter((cat) => cat.parentId == undefined);
    } else {
      category = categories.filter((cat) => cat.parentId == parentId);
    }
  
    for (let cate of category) {
      categoryList.push({
        _id: cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId: cate.parentId,
        type: cate.type,
        children: createCategories(categories, cate._id),
      });
    }
  
    return categoryList;
  }

const addCategory = async(req, res) => {
    const {name, slug, type, parentId, categoryImage, createdBy} = req.body;
    const categoryObj = {
        name: name,
        slug: slugify(name),
        createdBy: createdBy
    }

    if(parentId){
        categoryObj.parentId = parentId;
    }

    try {
        const category = await Category.create(categoryObj);
        res.status(200).json({category})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getCategory = async(req, res) => {
    const categories =await Category.find({});
    if(categories){
        const categoryList = createCategories(categories);
        res.status(200).json({ categoryList });
    }
}

module.exports = {addCategory,getCategory}