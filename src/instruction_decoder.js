/**
 * Sentinel-X: Instruction Decoder
 * Translates raw buffer data from Solana transactions into readable governance actions.
 */
class InstructionDecoder {
    decode(data) {
        const discriminator = data[0];
        const instructionMap = {
            0: 'CreateProposal',
            1: 'CastVote',
            2: 'ExecuteProposal',
            3: 'CancelProposal'
        };
        return {
            action: instructionMap[discriminator] || 'UnknownAction',
            discriminator,
            rawData: data.toString('hex')
        };
    }
}
module.exports = InstructionDecoder;
