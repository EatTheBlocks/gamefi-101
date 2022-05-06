//SPDX-License-Identifier: UNLICENSED
pragma solidity <=0.8.10;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "./BotPrevent.sol";

contract Floppy is
    ERC20("Floppy", "FLP"),
    ERC20Burnable,
    Ownable
{
    using SafeMath for uint256;
    uint256 private cap = 50_000_000_000 * 10**uint256(18);
    BPContract public BP;
    bool public bpEnabled;
    event BPAdded(address indexed bp);
    event BPEnabled(bool indexed _enabled);
    event BPTransfer(address from, address to, uint256 amount);

    constructor() {
        _mint(msg.sender, cap);
        transferOwnership(msg.sender);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(
            ERC20.totalSupply() + amount <= cap,
            "Floppy: cap exceeded"
        );
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20) {
        super._beforeTokenTransfer(from, to, amount);
    }

    function setBpAddress(address _bp) external onlyOwner {
        require(address(BP) == address(0), "Can only be initialized once");
        BP = BPContract(_bp);

        emit BPAdded(_bp);
    }

    function setBpEnabled(bool _enabled) external onlyOwner {
        require(address(BP) != address(0), "You have to set BP address first");
        bpEnabled = _enabled;
        emit BPEnabled(_enabled);
    }

    /**
     * @dev Add the BP handler to prevents the bots.
     *
     **/
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    ) internal virtual override {
        if (bpEnabled) {
            BP.protect(sender, recipient, amount);
            emit BPTransfer(sender, recipient, amount);
        }
        super._transfer(sender, recipient, amount);
    }
}
