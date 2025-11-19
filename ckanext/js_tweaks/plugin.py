import ckan.plugins as p
import ckan.plugins.toolkit as tk
from ckan.common import CKANConfig

from .helpers import get_helpers


class JsTweaksPlugin(p.SingletonPlugin):
    p.implements(p.IConfigurer)
    p.implements(p.ITemplateHelpers)

    # IConfigurer

    def update_config(self, config_: CKANConfig) -> None:
        tk.add_template_directory(config_, "templates")
        tk.add_public_directory(config_, "public")
        tk.add_resource("assets", "js_tweaks")

    # ITemplateHelpers
    def get_helpers(self):
        return get_helpers()
