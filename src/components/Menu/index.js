import React from 'react';
import Logo from '../../assets/image/Logo.png';
import './Menu.css';
import Button from '../Button';

export default function Menu() {
  return (
    <nav className="Menu">
      <a href="/">
        <img className="Logo" src={Logo} alt="ComicsFlix logo" />
      </a>
      <Button className="ButtonLink" to="/cadastro/video">
        Novo vídeo
      </Button>
    </nav>
  );
}
