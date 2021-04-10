// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Token.sol';

contract EthSwap {
    string public name = "Sensio Exchange";
    Token public token;
    uint public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        uint tokenAmount = msg.value*rate;
        require(token.balanceOf(address(this)) >= tokenAmount);
        token.transfer(msg.sender, tokenAmount);
        // emit an event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public {
        // comprobar que se tienen los tokens que se quieren vender 
        require(token.balanceOf(msg.sender) >= _amount);
        uint ethAmount = _amount / rate;
        // comprobar que tenemos suficiente ETH
        require(address(this).balance >= ethAmount);
        // venta de tokens
        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(ethAmount);
        // emit an event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}