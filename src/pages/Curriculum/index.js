import React from 'react'

import Container from 'components/Container'
import CurriculumManager from 'components/CurriculumManager'

/**
 * Classe Curriculum.
 * Essa classe gerenciará o estado do formulário de busca de Curricula das pessoas.
 */
class Curriculum extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showResult: false,
        }
    }

    /**
     * Método para alternar o estado do formulário de Busca vs Resultados.
     */
    changeFormState = () => {

        if (this.state.showResult) {
            this.setState({showResult: false})
        } else {
            this.setState({showResult: true})
        }

    }

    render() {

        const tabStruct = [
            {
                title: 'Buscar Currículos',
                component: (
                    <CurriculumManager showResult={this.state.showResult} changeFormState={this.changeFormState}/>
                ),
            },
        ]

        return (
            <div>
                <Container activeItem='Currículos' tabStruct={tabStruct}/>
            </div>
        )
    }

}

export default Curriculum