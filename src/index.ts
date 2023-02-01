// import type { PluginOption } from 'vite'

/**
 * 提供一种简单的方式通过脚本指令上的参数去设置环境变量
 * @param defaultEnv 指令上为获取到参数时的默认值
 * @param key 添加到环境变量上的键
 * 
 * @example 通过 process.env.APP_ENV 获取
 */

interface Options {
    defaultEnv?: string;
    key?: string;
}

/**
 * 从 npm_config_argv 获取指令上的参数
 * @example yarn start:test -> test
 */
export const getCommandArgv = () => {
    if(process.env?.npm_lifecycle_event) {
        const [_, env] = process.env?.npm_lifecycle_event.split(':');
        return env
    }
    const argv = process.env?.npm_config_argv;
    if (!argv) {
        throw new Error('npm_config_argv is not defined, please upgrade your npm');
    }
    const {original} = JSON.parse(argv || '');
    const commandAll = original[0];
    const [_, env] = commandAll.split(':');
    return env
}

/**
 * 
 * @param options?: {defaultEnv = 'dev', key = 'APP_ENV'}} 
 * @returns 
 */
export default function CommandSetEnv(options?: Options) {
    const { defaultEnv = 'dev', key = 'APP_ENV' } = options || {};
    const commandArgs = getCommandArgv() || defaultEnv;

    return {
        name: 'vite-plugin-env-command',
        config: () => ({
            define: {
                'process.env': JSON.stringify({
                    [key]: commandArgs
                }),
            }
        })
    }
}