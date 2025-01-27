import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import logo from "../../img/myWallet.png";
import { registerUser } from "../../service/service.auth.js";
import Swal from "sweetalert2";

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const history = useHistory();

    const register = (event) => {
        event.preventDefault();

        if (!email || !name || !password || !confirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Preencha todos os campos'
            })
        }


        if (name.length < 3) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Nome deve conter no mínimo 3 letras'
            })
        }


        if (password !== confirmPassword) {
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Senhas não correspondentes'
            })
        }

        registerUser(name, email, password)
            .then(() => {
                history.push("/");
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Cadastro realizado com sucesso',
                    showConfirmButton: false,
                    timer: 900,
                    width: 250
                });
            })
            .catch(() => {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Algo deu errado com o cadastro'
                })
            });
    };

    return (
        <Background>
            <Wrapper onSubmit={register}>
                <Logo src={logo} />
                <Input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <Input
                    type="password"
                    placeholder="Confirme a senha"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <Button type="submit">Cadastrar</Button>
                <SignInPath onClick={() => history.push("/")}>
                    Já tem uma conta? Entre agora!
                </SignInPath>
            </Wrapper>
        </Background>
    );
}

const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #8c11be;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Logo = styled.img`
    width: 147px;
    height: 40px;
    margin-bottom: 24px;
`;

const Wrapper = styled.form`
    width: 87%;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Input = styled.input`
    width: 100%;
    height: 58px;
    border: none;
    border-radius: 5px;
    margin-bottom: 13px;
    padding: 17px 15px 17px 15px;
    font-size: 20px;

    ::placeholder {
        font-family: "Raleway", sans-serif;
        font-weight: 400;
        font-size: 20px;
        color: black;
    }
`;

const Button = styled.button`
    width: 100%;
    height: 46px;
    border: none;
    border-radius: 5px;
    background-color: #a328d6;
    color: white;
    font-weight: 700;
    font-size: 20px;
    font-family: "Raleway", sans-serif;
    margin-bottom: 32px;
`;

const SignInPath = styled.button`
    width: auto;
    height: 18px;
    background-color: inherit;
    color: white;
    font-size: 15px;
    font-weight: 700;
    border: none;
`;
