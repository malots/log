import test from 'tape';
import Log from '../src/log';

const log = new Log('console','info');

test('Teste de mensagem de info na tela', function(t) {
    log.input('Teste de mensagem');
    t.true(true);
    t.end();
});

test('Teste de mensagem de log na tela', function(t) {
    log.setLevel('log');
    log.input('Teste de mensagem');
    t.true(true);
    t.end();
});

test('Teste de mensagem de warn na tela', function(t) {
    log.setLevel('warn');
    log.input('Teste de mensagem');
    t.true(true);
    t.end();
});

test('Teste de mensagem de erro na tela', function(t) {
    log.setLevel('error');
    log.input('Teste de mensagem');
    t.true(true);
    t.end();
});

test('Teste de mensagem de log no arquivo', function(t) {
    log.setType('file');
    log.setLevel('log');
    log.input('Teste de mensagem');
    t.true(true);
    t.end();
});