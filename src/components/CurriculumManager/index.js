import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {openSnackbar} from 'reducers/snackbar/action-creators'
import {getContent, filterContent, filterContentSuccess, deleteContent} from 'reducers/firestore/action-creators'
import {openForm} from 'reducers/content-form/action-creators'
import {connect} from 'react-redux'

import 'typeface-roboto' // AVISO! Adicionei essa biblioteca para fontes nos Headers!
import Paper from '@material-ui/core/Paper'
import {unstable_Box as Box} from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Radio from '@material-ui/core/Radio'
import SearchIcon from '@material-ui/icons/Search'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Typography from '@material-ui/core/Typography'
import BackIcon from '@material-ui/icons/ArrowBack'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CurriculumData from '../CurriculumData'

import styles from './styles'
import {withStyles} from '@material-ui/styles'

import imgurUtils from 'utils/imgur'
import {compose, renderComponent} from 'recompose'

import {firebase} from '../../' // Importando firebase aqui!
import {RadioGroup} from '@material-ui/core';

class CurriculumPage extends React.Component {


    constructor(props) {
        super(props)

        const {
            openSnackbar,
            classes,
        } = props

        this.state = {
            openSnackbar,
            classes,
            rows: [],
            willShowData: true,

            // Atributos de estado relacionados ao formulário
            gender: [],
            highestgrade: [],
            techcourse: [],
            profexperience: [],
        }

    }

    /**
     * Método para transformar os dados de entrada em um dicionário.
     */
    addCellData = (name, gender, birthdate, highestgrade, techcourse, profexperience,
                   address, city, phone, email, info) => {
        return {
            name, gender, birthdate, highestgrade, techcourse, profexperience, address,
            city, phone, email, info
        }
    }

    /**
     * Método para reiniciar todos os dados resultantes da busca.
     */
    resetData() {

        // Resetando a variável auxiliar 'willShowData' para true,
        // ou seja, será colocado em estado que receberá informações novos
        // do banco de dados.
        this.setState({willShowData: true})

        // Resetando todas as informações pré-existentes de busca anteriores.
        this.state.rows.forEach(element => this.state.rows.pop(element))

        // Mostrando o formulário de busca novamente!
        this.props.changeFormState()
    }

    /**
     * Método para gerenciar os checkboxes relacionados a gênero.
     */
    handleGenderCheckbox = name => (event) => {

        if (event.target.checked) {
            this.state.gender.push(String(event.target.value).toLowerCase())
        } else {

            for (let i = 0; i < this.state.gender.length; i++) {
                if (this.state.gender[i] == (event.target.value).toLowerCase()) {
                    this.state.gender.splice(i, 1)
                    break
                }
            }

        }

    }

    /**
     * Método para gerenciar os checkboxes relacionados a Maior Grau de Educação.
     */
    handleHighestGradeCheckbox = id => (event) => {

        if (event.target.checked) {
            this.state.highestgrade.push(id)
        } else {

            for (let i = 0; i < this.state.highestgrade.length; i++) {
                if (this.state.highestgrade[i] == id) {
                    this.state.highestgrade.splice(i, 1)
                    break
                }
            }

        }

    }

    /**
     * Método para gerenciar os checkboxes relacionados a Ensino Profissionalizante (Curso Técnico).
     */
    handleTechCourseCheckbox = id => (event) => {

        if (event.target.checked) {
            this.state.techcourse.push(event.target.value)
        } else {

            for (let i = 0; i < this.state.techcourse.length; i++) {
                if (this.state.techcourse[i] == id) {
                    this.state.techcourse.splice(i, 1)
                    break
                }
            }

        }

    }

    /**
     * Método para gerenciar os checkboxes relacionados a Experiência Profissional.
     */
    handleProfExperienceCheckbox = value => (event) => {

        if (event.target.checked) {
            this.state.profexperience.push(value)
        } else {

            for (let i = 0; i < this.state.profexperience.length; i++) {
                if (this.state.profexperience[i] == value) {
                    this.state.profexperience.splice(i, 1)
                    break
                }
            }

        }

    }

    /**
     * Método auxiliar para filtrar queries do Firestore de forma
     * dinâmica, ou seja, com parâmetro de buscas diferentes.
     *
     * ATENÇÃO! Esse método não é o mais otimizado para o servidor devido
     * a falta de operadores lógicos para a busca no Firestore! É recomendável
     * tentar buscar outro meio de filtro!!!
     */
    filterResult(doc) {

        let canShow = true

        if (!this.state.gender.includes(doc.data().gender.toLowerCase()) && this.state.gender.length > 0) {
            canShow = false
        } else if (!this.state.highestgrade.includes(parseInt(doc.data().highestgrade)) && this.state.highestgrade.length > 0) {
            canShow = false
        } else if (!this.state.profexperience.includes(doc.data().profexperience) && this.state.profexperience.length > 0) {
            canShow = false
        } else if (!this.state.techcourse.includes(String(doc.data().techcourse)) && this.state.techcourse.length > 0) {
            canShow = false
        }

        return canShow
    }

    /**
     * Método para carregar todas as informações do Firebase's Firestore
     * de acordo com a preferência do usuário.
     */
    renderData() {

        // Lembrando que se showResult (mudou para tela de resultados)
        // e willShowData (o banco de dados vai mostrar dados)... Os
        // dados deverão ser tratados!
        if (this.props.showResult && this.state.willShowData) {

            // Se há algo armazenado no "buffer" rows... Limpando tudo...
            if (this.state.rows.length > 0) {
                this.setState({rows: []})
            }


            firebase.firestore.collection("accounts").where("role", "==", "student-enabled").get().then((queryResults) => {

                let rows = []

                queryResults.forEach((doc) => {
                    if (this.filterResult(doc)) {

                        let toConvertData = doc.data()

                        // Padronizando gêneros (deixando tudo no diminutivo)
                        toConvertData.gender = toConvertData.gender.toLowerCase()

                        // Convertendo "Maior Grau Completo" de número para string
                        switch (toConvertData.highestgrade) {
                            case 1:
                                toConvertData.highestgrade = "Ensino Fundamental Incompleto"
                                break;
                            case 2:
                                toConvertData.highestgrade = "Ensino Fundamental Completo"
                                break;
                            case 3:
                                toConvertData.highestgrade = "Ensino Médio Incompleto"
                                break;
                            case 4:
                                toConvertData.highestgrade = "Ensino Médio Completo"
                                break;
                            case 5:
                                toConvertData.highestgrade = "Ensino Superior Incompleto"
                                break;
                            case 6:
                                toConvertData.highestgrade = "Ensino Superior Completo"
                                break;
                            default:
                                toConvertData.highestgrade = "?"
                        }

                        // Convertendo Experiência Profissional de booleano para string
                        if (toConvertData.profexperience == true) {
                            toConvertData.profexperience = "Sim"
                        } else {
                            toConvertData.profexperience = "Não"
                        }

                        // Convertendo Ensino Técnico de booleano para string
                        switch (toConvertData.techcourse) {
                            case 1:
                                toConvertData.techcourse = "Técnico"
                                break;
                            case 2:
                                toConvertData.techcourse = "Tecnólogo"
                                break;
                            default:
                                toConvertData.techcourse = "Nenhum"
                        }

                        // Tratando informação sobre DDN vazias...
                        if (toConvertData.birthdate == "" || toConvertData.birthdate == null) {
                            toConvertData.birthdate = "?"
                        }


                        rows.push(this.addCellData(toConvertData.name, toConvertData.gender, toConvertData.birthdate, toConvertData.highestgrade,
                            toConvertData.techcourse, toConvertData.profexperience, toConvertData.address, toConvertData.city,
                            toConvertData.phone, toConvertData.email, "?"))

                    }
                })

                // Limpando todos os parâmetros de busca...
                // E também diremos que não precisaremos obter mais nada do banco de dados
                this.setState({
                    gender: [],
                    highestgrade: [],
                    techcourse: [],
                    profexperience: [],
                    willShowData: false,
                    rows: rows
                })

            })
                .catch(err => {
                    //console.log(err)
                    console.log("[ERROR] Database is not available or the connection was refused!")
                })
        }

    }

    render() {

        // Chamando método de validação de conteúdo.
        // Caso seja necessário buscar novas informações no banco de dados...
        // Os dados serão reamostrados na tela.
        this.renderData()

        // Renderizando componente...
        return (
            <Paper
                className={this.state.classes.root}
                component={Box}
                margin='auto'
                maxWidth={1920}
            >
                <AppBar
                    component={Box}
                    borderBottom='1px solid rgba(0, 0, 0, 0.12)'
                    position='static'
                    color='default'
                    maxWidth={1920}
                    elevation={0}
                    padding={2}>

                    <Grid
                        alignItems='left'
                        container>

                        {/* TÍTULO - Buscar Currículos */}
                        <Grid item xs={6}>
                            <Typography color='textPrimary' align='left' variant='h4' component='h4'>
                                Buscar Currículos
                            </Typography>
                        </Grid>

                        {/* Tweakzinho para ajustar o botão de Nova Consulta no GRID */}
                        {this.props.showResult ? (
                            <Grid item xs={4}></Grid>) : null}

                        {/* Botão de Nova Consulta */}
                        {this.props.showResult ? (
                            <Grid item xs={2}>
                                <Box mt={1}>
                                    <Button
                                        className={this.state.classes.button}
                                        color='primary'
                                        variant='contained'
                                        onClick={this.props.changeFormState}
                                    >
                                        Nova consulta
                                    </Button>
                                </Box>
                            </Grid>) : null}

                    </Grid>
                </AppBar>


                {this.props.showResult ?
                    (
                        /* Demonstrando uma lista de resultados do Banco de Dados */
                        <Grid
                            alignItems='left'
                            container
                            direction="column">
                            <Box padding={2}>

                                {/* Table View */}
                                <Grid item>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Nome</TableCell>
                                                <TableCell>Gênero</TableCell>
                                                <TableCell>Data de Nascimento</TableCell>
                                                <TableCell>Grau de Instrução</TableCell>
                                                <TableCell>Ensino Profissionalizante</TableCell>
                                                <TableCell>Experiência Profissional</TableCell>
                                                <TableCell>Informação</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>

                                            {this.state.willShowData ? null : (
                                                this.state.rows.map(row => (
                                                    <CurriculumData name={row.name} gender={row.gender}
                                                                    birthdate={row.birthdate}
                                                                    highestgrade={row.highestgrade}
                                                                    profexperience={row.profexperience}
                                                                    techcourse={row.techcourse}
                                                                    address={row.address}
                                                                    city={row.city} phone={row.phone}
                                                                    email={row.email}/>
                                                )))}

                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Box>
                        </Grid>
                    ) :
                    (
                        /* Demonstrando um formulário de busca */

                        <Grid
                            alignItems='left'
                            container
                            direction="column">

                            <Box padding={2}>

                                <Grid item>
                                    <Box mb={5}>
                                        <Typography>
                                        <p>Painel de filtro de buscas por atributos do Currículo do Aluno. Todos os campos são opcionais!</p>
                                        </Typography>
                                    </Box>
                                </Grid>

                                {/* Gênero */}
                                <Grid item>
                                    <Box mt={3}>
                                        <FormControl component="fieldset">
                                            <Box mb={2}>
                                                <Typography color='textPrimary' align='left' variant='h4'
                                                            component='h4'>
                                                    Gênero:
                                                </Typography>
                                            </Box>
                                            <Box ml={1}>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox value="Masculino"
                                                                           onChange={this.handleGenderCheckbox()}/>}
                                                        label="Masculino"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox value="Feminino"
                                                                           onChange={this.handleGenderCheckbox()}/>}
                                                        label="Feminino"
                                                    />
                                                </FormGroup>
                                            </Box>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                {/* Grau de Instrução */}
                                <Grid item>
                                    <Box mt={5}>
                                        <FormControl component="fieldset">
                                            <Box mb={2}>
                                                <Typography color='textPrimary' align='left' variant='h4'
                                                            component='h4'>
                                                    Grau de Instrução:
                                                </Typography>
                                            </Box>
                                            <Box ml={1}>
                                                <FormGroup>


                                                    <Grid container>

                                                        {/* Coluna da Esquerda */}

                                                        <Grid item xs={4}>
                                                            <FormControlLabel
                                                                control={<Checkbox value="Ensino Fundamental Incompleto"
                                                                                   onChange={this.handleHighestGradeCheckbox(1)}/>}
                                                                label="Ensino Fundamental Incompleto"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox value="Ensino Fundamental Completo"
                                                                                   onChange={this.handleHighestGradeCheckbox(2)}/>}
                                                                label="Ensino Fundamental Completo"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox value="Ensino Médio Incompleto"
                                                                                   onChange={this.handleHighestGradeCheckbox(3)}/>}
                                                                label="Ensino Médio Incompleto"
                                                            />
                                                            <FormControlLabel
                                                                control={<Checkbox value="Ensino Médio Completo"
                                                                                   onChange={this.handleHighestGradeCheckbox(4)}/>}
                                                                label="Ensino Médio Completo"
                                                            />
                                                        </Grid>

                                                        {/* Coluna da Direita */}

                                                        <Grid item xs={3}>
                                                            <Box ml={4}>
                                                                <FormControlLabel
                                                                    control={<Checkbox
                                                                        value="Ensino Superior Incompleto"
                                                                        onChange={this.handleHighestGradeCheckbox(5)}/>}
                                                                    label="Ensino Superior Incompleto"
                                                                />
                                                                <FormControlLabel
                                                                    control={<Checkbox value="Ensino Superior Completo"
                                                                                       onChange={this.handleHighestGradeCheckbox(6)}/>}
                                                                    label="Ensino Superior Completo"
                                                                />
                                                            </Box>
                                                        </Grid>

                                                    </Grid>

                                                </FormGroup>
                                            </Box>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                {/* Ensino Profissionalizante */}
                                <Grid item>
                                    <Box mt={5}>
                                        <FormControl component="fieldset">
                                            <Box mb={2}>
                                                <Typography color='textPrimary' align='left' variant='h4'
                                                            component='h4'>
                                                    Ensino Profissionalizante:
                                                </Typography>
                                            </Box>
                                            <Box ml={1}>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox value={1}
                                                                           onChange={this.handleTechCourseCheckbox(true)}/>}
                                                        label="Técnico"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox value={2}
                                                                           onChange={this.handleTechCourseCheckbox(false)}/>}
                                                        label="Tecnólogo"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox value={0}
                                                                           onChange={this.handleTechCourseCheckbox(false)}/>}
                                                        label="Nenhum"
                                                    />
                                                </FormGroup>
                                            </Box>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                {/* Experiência Profissional */}
                                <Grid item>
                                    <Box mt={5}>
                                        <FormControl component="fieldset">
                                            <Box mb={2}>
                                                <Typography color='textPrimary' align='left' variant='h4'
                                                            component='h4'>
                                                    Experiência Profissional:
                                                </Typography>
                                            </Box>
                                            <Box ml={1}>
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox value="Sim"
                                                                           onChange={this.handleProfExperienceCheckbox(true)}/>}
                                                        label="Sim"
                                                    />
                                                    <FormControlLabel
                                                        control={<Checkbox value="Não"
                                                                           onChange={this.handleProfExperienceCheckbox(false)}/>}
                                                        label="Não"
                                                    />
                                                </FormGroup>
                                            </Box>
                                        </FormControl>
                                    </Box>
                                </Grid>

                                {/* Botão de busca */}
                                <Grid item>
                                    <Box mt={5} mb={1}>
                                        <Button
                                            className={this.state.classes.button}
                                            color='primary'
                                            variant='contained'
                                            fullWidth='true'
                                            onClick={() => this.resetData()}
                                        >
                                            Buscar
                                        </Button>
                                    </Box>

                                </Grid>
                            </Box>
                        </Grid>
                    )}


            </Paper>
        )
    }

}

const mapStateToProps = ({firestore}) => ({firestore})

const mapDispatchToProps = dispatch => ({
    getContent: type => dispatch(getContent({type})),
    openSnackbar: options => dispatch(openSnackbar(options)),
    filterContent: query => dispatch(filterContent(query)),
    filterContentSuccess: () => dispatch(filterContentSuccess()),
    deleteContent: (uid, options) => dispatch(deleteContent(uid, options)),
    openForm: options => dispatch(openForm(options)),
})

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(CurriculumPage);