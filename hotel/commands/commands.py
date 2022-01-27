import click
import frappe

@click.command('truncate-doctype')
@click.argument('doctype')
@pass_context
def truncate_doctype(context, doctype):
    "truncate schema for a DocType"
    frappe.db.truncate(doctype)

commands = [
    truncate_doctype
]