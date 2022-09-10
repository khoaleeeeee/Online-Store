const Item = require("../models/Item");

exports.addItem = async (req, res) => {
  try {
    const { title, subtitle, category, brand, options, description } = req.body;
    const item = await new Item({
      title,
      subtitle,
      category,
      brand,
      options,
      description,
    }).save();

    res.send({
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      brand: item.brand,
      category: item.category,
      options: item.options,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const itemsList = [];
    Item.find({}, (err, items) => {
      items.forEach(function (item) {
        itemsList.push(item);
      });
      res.send(itemsList);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAnItem = async (req, res) => {
  try {
    const { item } = req.params;
    const itemObj = await Item.findOne({ title: item });
    res.send(itemObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const results = await Item.find({
      $text: { $search: searchTerm },
    }).select("title options");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const { category, brand } = req.params;
    if (category === "all" && brand === "all") {
      const items = await Item.find({});
      res.send(items);
    } else if (category === "all") {
      const items = await Item.find({ brand: brand });
      res.send(items);
    } else if (brand === "all") {
      const items = await Item.find({ category: category });
      res.send(items);
    } else {
      const items = await Item.find({
        category: category,
        brand: brand,
      });
      res.send(items);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
