import  * as dotenv from "dotenv";
dotenv.config();

export function contract_addr(contractNamePrefix: string, networkName: string): string {
    if(contractNamePrefix && networkName) {
        const key = `${networkName.toUpperCase()}_${contractNamePrefix.toUpperCase()}_CONTRACT_ADDR`;
        const addr = process.env[key] ;

        if(addr && addr !== '') {
            return addr;
        }
    }
    return '';
}

export function account_addr(userPrefix: string, networkName: string): string {
    if(userPrefix && networkName) {
        const key = `${networkName.toUpperCase()}_${userPrefix.toUpperCase()}_ACCOUNT_ADDR`;
        const addr = process.env[key];
        if(addr && addr !== '') {
            return addr;
        }
    }
    return '';
}

export function chain_name(networkName: string): string {
    if(networkName) {
        const key = `${networkName.toUpperCase()}_CHAIN_NAME`;
        const addr = process.env[key];
        if(addr && addr !== '') {
            return addr;
        }
    }
    return '';
}