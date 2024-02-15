class Category {
  constructor(id, title, link) {
    this.id = id;
    this.title = title;
    this.link = link;
  }
}

class Requests {
  constructor(email, mobile, stallname, categories, image) {
    this.email = email;
    this.mobile = mobile;
    this.stallname = stallname;
    this.categories = categories;
    this.image = image;
  }
}

export class Stall {
  constructor(id, title, link) {
    this.id = id;
    this.title = title;
    this.link = link;
  }
}
export default Category;
