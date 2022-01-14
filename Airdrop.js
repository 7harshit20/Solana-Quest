const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL,
    Transaction,
    Account,
} = require("@solana/web3.js");

const newPair = new Keypair();

const publicKey = new PublicKey(newPair._keypair.publicKey);
const secretKey = newPair._keypair.secretKey;

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const getWalletBalance = async () => {
    try {
        const myWallet = await Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(myWallet.publicKey);
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`   Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
    } catch (err) {
        console.log(err);
    }
};

const airDropSol = async () => {
    try {
        console.log(`-- Airdropping 2 SOL --`)
        const walletKeyPair = await Keypair.fromSecretKey(secretKey);
        const fromAirDropSignature = await connection.requestAirdrop(walletKeyPair.publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature);
    } catch (err) {
        console.log(err);
    }
};

const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
}
driverFunction();