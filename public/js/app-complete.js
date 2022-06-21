/* eslint-disable no-param-reassign, operator-assignment */

class ProductList extends React.Component {
  state = {
    products: [],
  }

  componentDidMount() {
    this.setState({ products: Seed.products })
  }

  handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: +product.votes + 1,
        })
      } else {
        return product
      }
    })

    this.setState({
      products: nextProducts,
    })
  }

  handleAddNewProduct = (product) => {
    product.id = this.state.products.length + 1
    const updatedProducts = this.state.products.map((product) => {
      return product
    })
    
    updatedProducts.push(product)
    
    this.setState({
      products: updatedProducts,
    })
  }

  render() {
    const products = this.state.products.sort((a, b) => (
      b.votes - a.votes
    ))

    const productComponents = products.map((product) => (
      <Product
        key={`product-${product.id}`}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ))

    return (
      <div className='ui unstackable items'>
        {productComponents}
        <AddProductForm onAddNewProduct={this.handleAddNewProduct}/>
      </div>
    )
  }
}

class AddProductForm extends React.Component {
  
  constructor() {
    this.state = this.initialState()
  }

  initialState = () => {
    return {
      title: '',
      description: '',
      url: '',
      votes: 0,
      submitterAvatarUrl: '',
      productImageUrl: '',
    }
  }

  resetState = () => {
    this.setState(Object.assign({}, this.initialState()))
  }

  handleProductUpVote = (event) => {
    event.preventDefault()

    this.props.onAddNewProduct(Object.assign({}, this.state))
    this.resetState()
  }

  handleOnInput = (target) => (event) => {
    const { 
      target: {
        value
      } 
    } = event
    
    this.setState({
      [target]: value,
    })
  }

  render() {
    return (
      <form className="ui form" onSubmit={this.handleProductUpVote}>
        <div className="field">
          <label>Title</label>
          <input 
            type="text" 
            name="title" 
            placeholder="Title..."
            value={this.state.title}
            onChange={this.handleOnInput('title')}
          />
        </div>
        <div className="field">
          <label>Description</label>
          <input 
            type="text" 
            name="description" 
            placeholder="Description..." 
            value={this.state.description}
            onChange={this.handleOnInput('description')}
          />
        </div>
        <div className="field">
          <label>Url</label>
          <input 
            type="text" 
            name="url" 
            placeholder="Url..." 
            value={this.state.url}
            onChange={this.handleOnInput('url')}
          />
        </div>
        <div className="field">
          <label>Votes</label>
          <input 
            type="text" 
            name="votes" 
            placeholder="Votes..." 
            value={this.state.votes}
            onChange={this.handleOnInput('votes')}
          />
        </div>
        <div className="field">
          <label>Avatar Url</label>
          <input 
            type="text" 
            name="submitterAvatarUrl" 
            placeholder="Avatar url..." 
            value={this.state.submitterAvatarUrl}
            onChange={this.handleOnInput('submitterAvatarUrl')}
          />
        </div>
        <div className="field">
          <label>Image Url</label>
          <input 
            type="text" 
            name="productImageUrl" 
            placeholder="Image url..." 
            value={this.state.productImageUrl}
            onChange={this.handleOnInput('productImageUrl')}
          />
        </div>
        <button 
          className="ui primary button" 
          type="submit"
        >
          Save
        </button>
      </form>
    )
  }
}

class Product extends React.Component {
  handleUpVote = () => (
    this.props.onVote(this.props.id)
  )

  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
          <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>
              {this.props.title}
            </a>
            <p>
              {this.props.description}
            </p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img
              className='ui avatar image'
              src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('content')
)
