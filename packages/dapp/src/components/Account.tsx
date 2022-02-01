import Blockies from 'react-blockies';
import styled from 'styled-components';
import { Box, Text, Button } from 'grommet';
import { centerEllipsis, copyToClipboard } from '../utils/strings';
import { Storage } from '../utils/web3Storage';
import { fileToBlob } from '../utils/fileToBlob';

export interface AccountProps {
  account?: string;
}

const AccountIcon = styled(Blockies)`
  border-radius: 50%;
`;

const AccountHash = styled(Text)`
  margin-left: 8px;
  cursor: pointer;
`;

export const Account = ({ account }: AccountProps) => {

  if (!account) {
    return null;
  }
  const submit = () => {
    const storage = new Storage(process.env.WEB3_STORAGE_API_KEY ?? '')
    const file = fileToBlob({obj:{"fileName": "hello"}, fileName:'name'})
    console.log(file)
    storage.add(file)
  }

  return (
    <Box direction="row" align="center" pad='medium'>
      <Box>
        <AccountIcon
          seed={account}
          size={7}
          scale={4}
        />
      </Box>
      <AccountHash
        onClick={() => copyToClipboard(account)}
      >
        {centerEllipsis(account)}
      </AccountHash>
      <Button onClick={submit}></Button>
    </Box>
  );
};
