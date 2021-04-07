// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './Token.sol';

contract EthSwap {
    string public name = "EthSwap Sensio Exchange";
    Token public token;
    uint public rate = 100;

    event TokenPurchased(
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
        token.transfer(msg.sender, tokenAmount);

        require(token.balanceOf(address(this)) >= tokenAmount);

        // emit an event
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }
}