import { stringify as b, BEMEntity } from 'rebem-classname'

export default function b_(block: string) {
  return (entity: BEMConf = {}) => {
    return b({
      block,
      ...entity
    })
  }
}

interface BEMConf {
  tag?: string;
  elem?: string;
  mods?: {
      [key: string]: string | number | boolean;
  };
  mix?: BEMEntity | BEMEntity[];
  className?: string;
}
