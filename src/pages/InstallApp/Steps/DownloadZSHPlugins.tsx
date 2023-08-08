import { FC, useState } from 'react';
import * as SC from './styles';

interface DownloadZSHPluginsProps {}

// command:
//   'git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions',

interface ZSHPlugin {
  name: string;
  url: string;
}

const ZSHPlugins: ZSHPlugin[] = [
  {
    name: 'zsh-autosuggestions',
    url: 'https://github.com/zsh-users/zsh-autosuggestions',
  },
  {
    name: 'zsh-syntax-highlighting',
    url: 'https://github.com/zsh-users/zsh-syntax-highlighting',
  },
];

const DownloadZSHPlugins: FC<DownloadZSHPluginsProps> = () => {
  const [pluginIndexList, setPluginIndexList] = useState(new Set<number>());

  return (
    <SC.StepsContainer>
      {ZSHPlugins.map((item, index) => (
        <SC.CheckboxContainer
          key={item.name}
          onClick={() =>
            setPluginIndexList((s) => (s.has(index) ? (s.delete(index) as true) && new Set(s) : new Set(s.add(index))))
          }
        >
          <SC.Checkbox checked={pluginIndexList.has(index)} />
          {item.name}
        </SC.CheckboxContainer>
      ))}
      <SC.Button
        transition={{ duration: 0.2 }}
        whileHover={{ scale: 1.2, backgroundColor: '#f2f6f9' }}
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        style={{ y: '-50%' }}
        onClick={() => {
          console.log(pluginIndexList);
        }}
      >
        开始下载
      </SC.Button>
    </SC.StepsContainer>
  );
};

export default DownloadZSHPlugins;
