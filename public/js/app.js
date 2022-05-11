// transform-class-properties - feature of babel, who allows us use arrow function on the class,
// and initialize properties outside constructor. This help us avoid use .bind(this) on custom methods and avoid use constructor 

class Product extends React.Component {
    handleUpVote = () => {
        this.props.onVoteUp(this.props.id)
    }

    handleDownVote = () => {
        this.props.onVoteDown(this.props.id)
    }

    computedVoteCounterClass = () => {
        return this.props.votes > 0 ? 'green' : 'red'
    }

    render() {
        return (
            <div className='item'>
                <div className='image'>
                    <img src={this.props.productImageUrl} />
                </div>
                <div className='middle aligned content'>
                    <div className='header'>
                        <a onClick={this.handleUpVote}>
                            <i className='large caret up icon green' />
                        </a>
                        <a onClick={this.handleDownVote}>
                            <i className='large caret down icon red' />
                        </a>
                        <span className={this.computedVoteCounterClass()}>{this.props.votes}</span>
                    </div>
                    <div className='description'>
                        <a href={this.props.url}>
                            {this.props.title}
                        </a>
                        <p>{this.props.description}</p>
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

class ProductList extends React.Component {
    // Init component state
    state = {
        products: []
    }

    // React life hook
    componentDidMount() {
        this.setState({ products: Seed.products })
    }

    handleProductUpVote = (productId) => {
        // Copy products for new array becose state must be immuteble
        const nextProducts = this.state.products.map((product) => {
            if (product.id === productId) {
                return Object.assign({}, product, {
                    votes: product.votes + 1
                })
            }

            return product
        })

        // Update state
        this.setState({products: nextProducts})
    }

    handleProductDownVote = (productId) => {
        // Copy products for new array becose state must be immuteble
        const nextProducts = this.state.products.map((product) => {
            if (product.id === productId) {
                return Object.assign({}, product, {
                    votes: product.votes - 1
                })
            }

            return product
        })

        // Update state
        this.setState({products: nextProducts})
    }

    render() {
        const products = this.state.products.sort((a, b) => b.votes - a.votes)
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
                    onVoteUp={this.handleProductUpVote}
                    onVoteDown={this.handleProductDownVote}
                />
        ))

        return (
            <div className='ui unstackable items'>
                {productComponents}
            </div>
        )
    }
}

ReactDOM.render(
    <ProductList />, 
    document.getElementById('content')
    );
