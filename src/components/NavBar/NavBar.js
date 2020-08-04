import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';



const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark">
            <Navbar.Brand>Algo-Easy</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link href="/">Place Start !</Nav.Link>
                    <Nav.Link href="/">Place Target !</Nav.Link>
                    <NavDropdown title="Path Finding Algorithms" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/PathGrid/PathGrid">Dijkstra</NavDropdown.Item>
                        <NavDropdown.Item href="/">BFS</NavDropdown.Item>
                        <NavDropdown.Item href="/">DFS</NavDropdown.Item>
                        <NavDropdown.Item href="/">Greedy</NavDropdown.Item>
                        <NavDropdown.Item href="/">A*</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Sorting Algorithms" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/">Quick</NavDropdown.Item>
                        <NavDropdown.Item href="/">Merge</NavDropdown.Item>
                        <NavDropdown.Item href="/">Heap</NavDropdown.Item>
                        <NavDropdown.Item href="/">Bubble</NavDropdown.Item>
                        <NavDropdown.Item href="/">Binary</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar