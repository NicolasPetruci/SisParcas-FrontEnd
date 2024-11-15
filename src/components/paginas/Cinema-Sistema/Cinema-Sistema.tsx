import { Text, Grid, GridItem, Flex, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Button, useDisclosure, Drawer, Link } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import Cinema from "../../../interface/Cinema";
import { useEffect, useState } from "react";
import { useCinemaService } from "../../../services/hooks/useCinemaService";
import DrawerAtualizarCinema from "../../organismos/DrawerAtualizarCinema/DrawerAtualizarCinema";
import DrawerCadastroCinema from "../../organismos/DrawerCadastroCinema/DrawerCadastroCinema";
import Botao from "../../atomos/Botao/Botao";
import { Link as LinkRouter } from 'react-router-dom';



export default function CinemaSistema() {

    //declarações

    const [cinema, setCinema] = useState<Cinema[]>([]);
    const [cinemaSelecionado, setCinemaSelecionado] = useState<Cinema | null>(null);
    const cinemaService = useCinemaService();

    const { isOpen: isDrawerAtualizarOpen, onOpen: onDrawerAtualizarOpen, onClose: onDrawerAtualizarClose } = useDisclosure();
    const { isOpen: isDrawerCadastroOpen, onOpen: onDrawerCadastroOpen, onClose: onDrawerCadastroClose } = useDisclosure();

    //busca
    const buscarCinema = () => {
        try {
            cinemaService.getAllCinema().then((cinema) => setCinema(cinema));
        } catch (error) {
            alert("Erro ao obter cinemas");

        }
    }
    useEffect(() => {
        buscarCinema();

    }, [])

    //deleta
    const deletarCinema = async (idCinema: string) => {
        cinemaService.deleteCinema(idCinema);
        buscarCinema();


    };

    //atualiza
    const atualizarCinema = (cinemaAtualizado: Cinema) => {
        setCinema((cinemaPrevias) => {
            const cinemasAtualizados = cinemaPrevias.map((cinema) => {
                if (cinema.id === cinemaAtualizado.id) {
                    return cinemaAtualizado;
                }
                return cinema;
            });
            return cinemasAtualizados;
        });
    };

    const abrirDrawerAtualizar = (cinema: Cinema) => {
        setCinemaSelecionado(cinema);
        onDrawerAtualizarOpen();
    };

    const abrirDrawerCadastro = () => {
        onDrawerCadastroOpen();
    };

    return (
        <>

            <Grid w='100%' h='0px' templateRows='repeat(2, 1fr)'
                templateColumns='repeat(1, 1fr)'
                gap='50px'
            >

                <GridItem colSpan={4}>
                    <CaixaPadronizada alturaCaixa='25vh' justificarComponente='center' alinharItem='center'>
                        <>
                            <Flex h='100%' flexDir={'column'} justifyContent='start' alignItems='start'>
                                <Text textAlign='left' fontSize={22} fontWeight={900}>
                                    CINEMA
                                </Text>
                                <Text textAlign="justify">Um CRUD de cinemas é uma aplicação essencial para organizar e controlar cinemas de forma eficiente. Consiste em quatro operações básicas: Criar (Create), Ler (Read), Atualizar (Update) e Deletar (Delete), permitindo aos usuários gerenciar cinemas de maneira intuitiva e eficaz.</Text>
                            </Flex>
                            <Flex>
                                <Botao corTexto="white" classe="preto-lilas" aoClicar={abrirDrawerCadastro}> Cadastro </Botao>

                               
                            </Flex>


                        </>
                    </CaixaPadronizada>
                </GridItem>
                <GridItem w='100%' h='100%' colSpan={4} p='10'>
                    <CaixaPadronizada larguraCaixa='100%' alturaCaixa='100%'>
                        <>
                            <TableContainer>
                                <Table variant='striped' colorScheme='purple'>

                                    <Thead>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>SESSÃO</Th>
                                            
                                            
                                        </Tr>
                                    </Thead>
                                    <Tbody  >
                                        {cinema.map((cinema, index) => (
                                            <Tr key={index}>
                                                <Td whiteSpace={'wrap'}>{cinema.id}</Td>
                                                <Td whiteSpace={'wrap'}>{cinema.nome}</Td>
                                                
                                                <Td>
                                                    <Flex>
                                                        <Button className="amarelo-rejeita" onClick={() => deletarCinema(cinema.id!.toString())}> D</Button>
                                                        <Button className="roxo-aceita" onClick={() => abrirDrawerAtualizar(cinema)}> V </Button>
                                                       
                                                    </Flex>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                    <Tfoot>
                                        <Tr>
                                            <Th>ID</Th>
                                            <Th>SESSÃO</Th>
                                           

                                        </Tr>
                                    </Tfoot>
                                </Table>
                                <Drawer
                                    size="lg"
                                    isOpen={isDrawerAtualizarOpen}
                                    placement="right"
                                    onClose={onDrawerAtualizarClose}
                                >
                                    {cinemaSelecionado && (
                                        <DrawerAtualizarCinema
                                            isOpen={isDrawerAtualizarOpen}
                                            cinemaInterface={cinemaSelecionado}
                                            onClose={onDrawerAtualizarClose}
                                            onUpdate={atualizarCinema}
                                        />
                                    )}
                                </Drawer>

                                <Drawer
                                    size="lg"
                                    isOpen={isDrawerCadastroOpen}
                                    placement="right"
                                    onClose={onDrawerCadastroClose}
                                >
                                    {(
                                        <DrawerCadastroCinema
                                            isOpen={isDrawerCadastroOpen}
                                            onClose={onDrawerCadastroClose}
                                        />
                                    )}
                                </Drawer>
                            </TableContainer>
                        </>
                    </CaixaPadronizada>
                </GridItem>
            </Grid >

        </>
    )
}


