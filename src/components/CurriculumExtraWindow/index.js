import React from 'react'

import Typography from '@material-ui/core/Typography'
import { unstable_Box as Box } from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import NewWindow from 'react-new-window'


class CurriculumExtraWindow extends React.Component {

    constructor(props) {
        super(props)

    }



    render() {
        return(
            <NewWindow onUnload={() => this.props.isWindowUnloaded()}>
                {/* <Button color='primary' variant='contained' onClick={this.generatePdf}>Gerar PDF</Button> */}
                <Typography color='textPrimary' align='center'>
                    <p>Pressione CTRL+P para Imprimir ou Baixar</p>
                </Typography>
                <div id="printable">
                    <Box ml={3} mt={2}>
                        <Typography color='textPrimary' align='left' variant='h4' component='h4'>
                            {this.props.name}
                        </Typography>

                        <Box mt={3}>
                            <Typography color='textPrimary' align='left'>
                                Data de Nascimento: {this.props.birthdate}
                            </Typography>
                            <Typography color='textPrimary' align='left'>
                                Endereço: {this.props.address}, {this.props.city}
                            </Typography>
                            <Typography color='textPrimary' align='left'>
                                Telefone: {this.props.phone}
                            </Typography>
                            <Typography color='textPrimary' align='left'>
                                E-Mail: {this.props.email}
                            </Typography>
                        </Box>

                        <Box mt={5}>
                            <Typography color='textPrimary' align='left' variant='h5' component='h5'>
                                EXPERIÊNCIA:
                            </Typography>
                            <Typography color='textPrimary' align='left'>
                                {this.props.profexperience == "Sim"?
                                (<p>* Contém experiência profissional prévia</p>) : 
                                (<p>* Não contém experiência profissional prévia</p>)}
                            </Typography>
                        </Box>

                        <Box mt={5}>
                            <Typography color='textPrimary' align='left' variant='h5' component='h5'>
                                FORMAÇÃO ACADÊMICA:
                            </Typography>
                            <Typography color='textPrimary' align='left'>
                                <p>* Grau de ensino: {this.props.highestgrade}</p>
                                <p>* Ensino Profissionalizante: {this.props.techcourse}</p>
                            </Typography>
                        </Box>
                    </Box>
                </div>
            </NewWindow>
        )
    }

}

export default CurriculumExtraWindow