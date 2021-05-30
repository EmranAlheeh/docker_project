import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class BooksUpdate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            price: '',
            author: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputPrice = async event => {
        const price = event.target.validity.valid
            ? event.target.value
            : this.state.price

        this.setState({ price })
    }

    handleChangeInputAuthor = async event => {
        const author = event.target.value
        this.setState({ author })
    }

    handleUpdateBook = async () => {
        const { id, name, price, author } = this.state
        const arrayAuthor = author.split('/')
        const payload = { name, price, author: arrayAuthor }

        await api.updateBookById(id, payload).then(res => {
            window.alert(`Book updated successfully`)
            this.setState({
                name: '',
                price: '',
                author: '',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const book = await api.getBookById(id)

        this.setState({
            name: book.data.data.name,
            price: book.data.data.price,
            author: book.data.data.author.join('/'),
        })
    }

    render() {
        const { name, price, author } = this.state
        return (
            <Wrapper>
                <Title>Create Book</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Price: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={price}
                    onChange={this.handleChangeInputPrice}
                />

                <Label>Author: </Label>
                <InputText
                    type="text"
                    value={author}
                    onChange={this.handleChangeInputAuthor}
                />

                <Button onClick={this.handleUpdateBook}>Update Book</Button>
                <CancelButton href={'/books/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default BooksUpdate