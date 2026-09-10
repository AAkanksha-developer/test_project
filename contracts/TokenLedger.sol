// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TokenLedger {

    string public name;
    string public symbol;

    uint256 public totalSupply;

    mapping(address => uint256) private balances;

    event Mint(
        address indexed to,
        uint256 amount
    );

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount
    );

    constructor(
        string memory _name,
        string memory _symbol
    ) {
        name = _name;
        symbol = _symbol;
    }

    // ==========================================
    // MINT
    // ==========================================

    function mint(
        address to,
        uint256 amount
    ) public {

        require(
            to != address(0),
            "Invalid recipient"
        );

        require(
            amount > 0,
            "Amount must be greater than zero"
        );

        balances[to] += amount;

        totalSupply += amount;

        emit Mint(
            to,
            amount
        );
    }


    // ==========================================
    // TRANSFER
    // ==========================================

    function transfer(
        address to,
        uint256 amount
    ) public returns (bool) {

        require(
            to != address(0),
            "Invalid recipient"
        );

        require(
            amount > 0,
            "Amount must be greater than zero"
        );

        require(
            balances[msg.sender] >= amount,
            "Insufficient balance"
        );

        balances[msg.sender] -= amount;

        balances[to] += amount;

        emit Transfer(
            msg.sender,
            to,
            amount
        );

        return true;
    }


    // ==========================================
    // BALANCE
    // ==========================================

    function balanceOf(
        address account
    ) public view returns (uint256) {

        return balances[account];
    }


    // ==========================================
    // CHECK SUPPLY
    // ==========================================

    function getTotalSupply()
        public
        view
        returns (uint256)
    {
        return totalSupply;
    }
}