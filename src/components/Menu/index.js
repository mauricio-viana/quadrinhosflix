import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/image/Logo.png';
import './Menu.css';
import Button from '../Button';

export default function Menu() {
  return (
    <nav className="Menu">
      <a href="/">
        <img className="Logo" src={Logo} alt="ComicsFlix logo" />
      </a>
      <Button as={Link} className="ButtonLink" to="/cadastro/video">
        Novo vídeo
      </Button>
    </nav>
  );
}
