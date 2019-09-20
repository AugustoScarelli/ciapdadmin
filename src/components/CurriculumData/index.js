import React from 'react'

import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { Button } from '@material-ui/core';

import CurriculumExtraWindow from '../CurriculumExtraWindow'

class CurriculumData extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            name: props.name,
            gender: props.gender,
            birthdate: props.birthdate,
            highestgrade: props.highestgrade,
            techcourse: props.techcourse,
            profexperience: props.profexperience,
            address: props.address,
            city: props.city,
            phone: props.phone,
            email: props.email,
            info: false
        }

    }

    /**
     * Método para acionar o aparecimento da janela de informações extras / currículos em si.
     */
    handleOnClick = () => {
        this.setState({info: true})
    }

    /**
     * Método para avisar que a janela de informações extra foi fechada,
     * assim ela poderá ser aberta novamente.
     */
    isWindowUnloaded = () => {
        this.setState({info: false})
    }

    render() {
        return (
            <TableRow>
                <TableCell>{this.state.name}</TableCell>
                <TableCell>{this.state.gender}</TableCell>
                <TableCell>{this.state.birthdate}</TableCell>
                <TableCell>{this.state.highestgrade}</TableCell>
                <TableCell>{this.state.techcourse}</TableCell>
                <TableCell>{this.state.profexperience}</TableCell>
                <TableCell>
                    <Button color='accent' variant='contained' onClick={this.handleOnClick}>
                        Ver
                        {this.state.info? (
                            <CurriculumExtraWindow isWindowUnloaded={this.isWindowUnloaded} name={this.state.name}
                                gender={this.state.gender} birthdate={this.state.birthdate} highestgrade={this.state.highestgrade}
                                    techcourse={this.state.techcourse} profexperience={this.state.profexperience}
                                        address={this.state.address} city={this.state.city} 
                                            phone={this.state.phone} email={this.state.email} />
                            ) : null}
                    </Button>
                </TableCell>
            </TableRow>
        )
    }

}

export default CurriculumData