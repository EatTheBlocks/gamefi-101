//SPDX-License-Identifier: UNLICENSED
pragma solidity <=0.8.10;

import "openzeppelin-solidity/contracts/token/ERC20/utils/SafeERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";
import "openzeppelin-solidity/contracts/access/AccessControlEnumerable.sol";

contract Vault is Ownable,AccessControlEnumerable {
    IERC20 private token;
    uint256 public maxWithdrawAmount;
    bool public withdrawEnable;
    bytes32 public constant WITHDRAWER_ROLE = keccak256("WITHDRAWER_ROLE");
    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function setToken(IERC20 _token) public onlyOwner {
        token = _token;
    }
    function setWithdrawEnable(bool _isEnable) public onlyOwner {
        withdrawEnable = _isEnable;
    }
    function setMaxWithdrawAmount(uint256 _maxAmount) public onlyOwner {
        maxWithdrawAmount = _maxAmount;
    }

    /**
     * @dev send token from sender to this contract
     *
     * - 'amount' amount of token in transaction
     */
    function deposit(uint256 _amount) external {
        require(!Address.isContract(msg.sender));
        require(
            token.balanceOf(msg.sender) >= _amount,
            "Insufficient account balance"
        );
        SafeERC20.safeTransferFrom(token, msg.sender, address(this), _amount);
    }

    receive() external payable {}

    /**
     * @dev send token from this address to other
     *
     * - 'amount' amount of token in transaction
     * - 'to' receipt address
     */
    function withdraw(
        uint256 _amount,
        address _to
    ) external onlyWithdrawer {
        require(!Address.isContract(msg.sender));
        require(withdrawEnable,"Withdraw is not available");
        require(_amount<=maxWithdrawAmount,"Exceed maximum amount");
        token.transfer(_to, _amount);
    }

    /**
     * @dev send all of tokens in this address to owner address
     *
     * - `token` token address
     * - Only use this function in emergency
     */
    function emergencyWithdraw() public onlyOwner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyWithdrawer() {
        require(owner() == _msgSender()||hasRole(WITHDRAWER_ROLE,_msgSender()), "Caller is not a withdrawer");

        _;
    }

}
