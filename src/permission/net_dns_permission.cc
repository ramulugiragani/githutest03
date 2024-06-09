#include "net_dns_permission.h"

#include <string>
#include <vector>

namespace node {

namespace permission {

void NetDNSPermission::Apply(Environment* env,
                             const std::vector<std::string>& allow,
                             PermissionScope scope) {
  deny_all_ = true;
}

bool NetDNSPermission::is_granted(Environment* env,
                                  PermissionScope perm,
                                  const std::string_view& param) const {
  return deny_all_ == false;
}

}  // namespace permission
}  // namespace node
