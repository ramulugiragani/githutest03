// This simulates specifying the configuration option --openssl-system-ca-path
// and setting it to a file that does not exist.
#define NODE_OPENSSL_SYSTEM_CERT_PATH "/missing/ca.pem"

#include "crypto/crypto_context.h"
#include "gtest/gtest.h"
#include "node_options.h"
#include "node_test_fixture.h"
#include "openssl/err.h"

class NodeCryptoTest : public EnvironmentTestFixture {};

/*
 * This test verifies that a call to NewRootCertDir with the build time
 * configuration option --openssl-system-ca-path set to an missing file, will
 * not leave any OpenSSL errors on the OpenSSL error stack.
 * See https://github.com/nodejs/node/issues/35456 for details.
 */
TEST_F(NodeCryptoTest, NewRootCertStore) {
  const v8::HandleScope handle_scope(isolate_);
  Argv argv;

  Env test_env{handle_scope, argv};

  node::Environment* env = *test_env;
  node::LoadEnvironment(env, "");

  node::per_process::cli_options->ssl_openssl_cert_store = true;
  X509_STORE* store = node::crypto::NewRootCertStore(env);
  ASSERT_TRUE(store);
  ASSERT_EQ(ERR_peek_error(), 0UL) << "NewRootCertStore should not have left "
                                      "any errors on the OpenSSL error stack\n";
  X509_STORE_free(store);
}
