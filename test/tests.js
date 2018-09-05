import test from 'tape';
import Log from '..';

const log = new Log('console','info');

test('Teste de mensagem de info na tela', function(t) {
    log.input('Teste de info');
    t.true(true);
    t.end();
});

test('Teste de mensagem de log na tela', function(t) {
    log.setLevel('log');
    log.input('Teste de log');
    t.true(true);
    t.end();
});

test('Teste de mensagem de warn na tela', function(t) {
    log.setLevel('warn');
    log.input('Teste de warn');
    t.true(true);
    t.end();
});

test('Teste de mensagem de erro na tela', function(t) {
    log.setLevel('error');
    log.input('Teste de erro');
    t.true(true);
    t.end();
});

test('Teste de mensagem de log no arquivo', function(t) {
    log.setType('file');
    log.setLevel('log');
    log.setPath('/tmp/api');
    log.input('Teste de log');
    t.true(true);
    t.end();
});

test('Teste de mensagem de info no arquivo', function(t) {
    log.setType('file');
    log.setLevel('info');
    log.setPath('/tmp/api');
    log.input('Teste de info');
    t.true(true);
    t.end();
});

test('Teste de mensagem de warn no arquivo', function(t) {
    log.setType('file');
    log.setLevel('warn');
    log.setPath('/tmp/api');
    log.input('Teste de warn');
    t.true(true);
    t.end();
});

test('Teste de mensagem de error no arquivo', function(t) {
    log.setType('file');
    log.setLevel('error');
    log.setPath('/tmp/api');
    log.input('Teste de erro');
    t.true(true);
    t.end();
});

test('Teste de mensagem de info na tela com opção inválida', function(t) {
    log.setType('inválida');
    log.setLevel('inválido');
    log.input('Teste de info');
    t.true(true);
    t.end();
});