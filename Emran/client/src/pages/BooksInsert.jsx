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

class BooksInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
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

        this.setState({ price: price })
    }

    handleChangeInputAuthor = async event => {
        const author = event.target.value
        this.setState({ author })
    }

    handleIncludeBook = async () => {
        const { name, price: price, author } = this.state
        const arrayAuthor = author.split('/')
        const payload = { name, price: price, author: arrayAuthor }

        await api.insertBook(payload).then(res => {
            window.alert(`Book inserted successfully`)
            this.setState({
                name: '',
                price: '',
                author: '',
            })
        })
    }

    render() {
        const { name, price: price, author } = this.state
        return (
            <Wrapper>
                <Title>Add Book</Title>

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
                    pattern="[0-9]+"
                    value={price}
                    onChange={this.handleChangeInputPrice}
                />

                <Label>Author: </Label>
                <InputText
                    type="text"
                    value={author}
                    onChange={this.handleChangeInputAuthor}
                />

                <Button onClick={this.handleIncludeBook}>Add Book</Button>
                <CancelButton href={'/books/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default BooksInsert