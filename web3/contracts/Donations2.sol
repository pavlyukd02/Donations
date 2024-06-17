// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Donations {
    uint256 public totalCollected;
    uint256 public campaignCount;
    mapping(uint256 => Campaign) public campaigns;
    uint256 private nextCampaignId = 1; // Используем уникальный идентификатор

    struct Donation {
        address donator;
        uint256 amount;
    }

    struct Campaign {
        uint256 id; // Уникальный идентификатор кампании
        address owner;
        string name;
        string title;
        string description;
        string imageUrl;
        uint256 target;
        uint256 collectedAmount;
        uint256 withdrawedAmount;
        uint256 deadline;
        bool closed; // Флаг закрытия кампании
        Donation[] donations;
    }

    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed owner,
        string title
    );
    event CampaignClosed(uint256 indexed campaignId);
    event DonateReceived(
        uint256 indexed campaignId,
        address indexed donator,
        uint256 amount
    );
    event Withdrawal(
        uint256 indexed campaignId,
        address indexed owner,
        uint256 amount
    );

    modifier onlyOwner(uint256 _id) {
        require(
            msg.sender == campaigns[_id].owner,
            "You are not the owner of this campaign."
        );
        _;
    }

    function createCampaign(
        string memory _name,
        string memory _title,
        string memory _description,
        string memory _imageUrl,
        uint256 _target,
        uint256 _deadline
    ) public returns (uint256) {
        require(_deadline > block.timestamp, "Deadline must be in the future.");
        require(_target > 0, "Target must be bigger than 0.");

        Campaign storage newCampaign = campaigns[nextCampaignId];

        newCampaign.id = nextCampaignId;
        newCampaign.owner = msg.sender;
        newCampaign.name = _name;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.imageUrl = _imageUrl;
        newCampaign.deadline = _deadline;
        newCampaign.target = _target;

        emit CampaignCreated(nextCampaignId, msg.sender, _title);
        nextCampaignId++;
        campaignCount++;
        return newCampaign.id;
    }

    function updateCampaign(
        uint256 id,
        string memory _name,
        string memory _title,
        string memory _description,
        string memory _imageUrl,
        uint256 _deadline
    ) public onlyOwner(id) returns (bool) {
        campaigns[id].name = _name;
        campaigns[id].title = _title;
        campaigns[id].description = _description;
        campaigns[id].imageUrl = _imageUrl;
        campaigns[id].deadline = _deadline;
        return true;
    }

    function closeCampaign(uint256 _id) public onlyOwner(_id) {
        campaigns[_id].closed = true;
        emit CampaignClosed(_id);
    }

    function donate(uint256 _id) public payable {
        Campaign storage campaign = campaigns[_id];

        campaign.donations.push(Donation(msg.sender, msg.value));
        campaign.collectedAmount += msg.value;
        totalCollected += msg.value;

        emit DonateReceived(_id, msg.sender, msg.value);
    }

    function withdraw(uint256 _id, uint256 _amount) public onlyOwner(_id) {
        Campaign storage campaign = campaigns[_id];

        require(
            _amount <= campaign.collectedAmount - campaign.withdrawedAmount,
            "The amount withdrawn must be less than or equal to the withdrawnable amount."
        );

        campaign.withdrawedAmount += _amount;
        payable(msg.sender).transfer(_amount);

        emit Withdrawal(_id, msg.sender, _amount);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](campaignCount);
        uint256 counter = 0;
        for (uint256 i = 1; i < nextCampaignId; i++) {
            if (!campaigns[i].closed) {
                allCampaigns[counter] = campaigns[i];
                counter++;
            }
        }

        return allCampaigns;
    }

    function getDonations(uint256 _id) public view returns (Donation[] memory) {
        return campaigns[_id].donations;
    }
}
